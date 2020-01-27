# REFOOD

* Gestión de configuración y provisionamiento
* Análisis de prestaciones

## Gestión de configuracion y provisionamiento
Para el despliegue del servicio emplearemos una máquina virtual, que deberemos configurar y provisionar empleando diversas herramientas y posibilidades mostradas en la asignatura. Concretamente para la gestión de configuraciones emplearemos Vagrant, que nos ofrece de una manera sencilla la posibilidad de configurar instancias directamente desde el vagrantfile con virtualbox, y de provisionarlar empleando diversos proveedores como Ansible o Docker entre otros. Para ello deberemos de definir dicho archivo de configuración, que podemos instanciar directamente desde línea de órdenes empleando el comando `vagrant init <imagen base - opcional>`. Esto nos creará dicho fichero con una configuración inicial básica.

### Vagrantfile
 En este archivo definiremos como ya hemos mencionado la configuración de nuestras VMs. Deberemos de indicar la imagen que emplearemos de base de la VM, que en nuestro caso es `ubuntu/bionic64`, concretamente la versión LTS 18.04 que venimos utilizando durante todo el desarrollo del servicio.
 ```
  config.vm.box = "ubuntu/bionic64"
 ```

 Deberemos de redireccionar los puertos desde el anfitrión a la VM de manera que podamos acceder a los servicios a través de los mismos puertos con los que fueron configurados. En nuestro caso, el 8080 y el 8000.
 ```
 config.vm.network "forwarded_port", guest: 8080, host: 8080 
 config.vm.network "forwarded_port", guest: 8000, host: 8000 
 ```
 Como provider usaremos virtualbox, especificando la configuración de la instancia a levantar, concretamente la cantidad de memoria y cpus disponibles:
 ```
 config.vm.provider "virtualbox" do |vb|
    vb.memory = "6144" 
    vb.cpus = "4"
 end
```

Vagrant nos ofrece la posibilidad de provisionar empleando diversos proveedores como Ansible, a través de los denominados playbooks, directamente desde el vagrantfile, sin necesidad de invocar `ansible-playbook`.
```
 config.vm.provision :ansible do |ansible|
    ansible.playbook = "playbook_provision_common.yml"
 end
```

> Puede consultar el [fichero vagrantfile](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/provision/Vagrantfile) si desea obtener más información relativa a su elaboración y opciones de confiuración empleadas.

Con el objetivo de respetar la modularidad en el proceso de provisionamiento de los diferentes micro-servicios, se han definido diversos playbooks, donde cada uno realiza las tareas de provisonamiento oportunas. 

El primero lo hemos definido commons, que contiene las tareas comunes para la ejecución de ambos micro-servicios. En el apartado de **playbooks** detallaremos más las opciones empleadas en éstos.

### Inventario y configuración
Para cada una de las instancias definidas, podemos especificar configuraciones determinadas, aplicables a grupos de dichas máquinas virtuales, gracias a varios archivos adicionales, como son `ansible.cfg` y `ansible_hosts`.

En el primero de ellos, se define la configuración general. En este se indicará la ruta del inventario o del fichero `ansible_hosts`, donde definimos la configuración específica para cada grupo de hosts creado, aunque en nuestro caso tan solo tenemos un grupo con una instancia.

> Puede consultar todos los detalles relativos a las opciones empleadas en el [ansible.cfg](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/provision/ansible.cfg) si desea obtener más información.

> Puede consultar todos los detalles relativos a las opciones empleadas en el [ansible hosts](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/provision/ansible_hosts.txt) si desea obtener más información.

### Playbooks
Los **playbooks** son ficheros que nos permiten realizar mediante la definición de tareas, el **provisionamiento** de VMs empleando **ansible**. Nos ofrece además la oportunidad de una gran ayuda como son los **roles**, que se encuntran publicados por la comunidad en la **galaxia**, y que usaremos en nuestro caso de cara emplear la base de datos en modo local, para tratar de mejorar las prestaciones del servicio, junto a **docker**, para realizar el provisionamiento empleando las imágenes de los micro-servicios publicadas en **dockerhub**.  

Como ya hemos indicado, de cara al **provisionamiento** de los recursos necesarios para el despliegue del servicio de manera **modular**, hemos definido 3 playbooks. 

El primero, denominado **common** define las tareas comunes al provisionamiento del servicio, como la ejecución de los roles indicados, la instalación de pip3, junto con el módulo de docker y copiar el fichero de variables de entorno en la instancia definida, necesarias para la ejecución del servicio.

> Puede consultar todos los detalles relativos a las opciones empleadas en el [playbook_common](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/provision/playbook_provision_common.yml) si desea obtener más información.

Al mismo nivel, definiriamos los dos siguientes playbooks, uno para cada uno de los dos micro-servicios. En estos tan solo nos será necesario incluir la ejecución del comando **pull** sobre los contenedores de los micro-servicios publicados, **sin necesidad de** tareas adicionales como la descarga desde git del repositorio y la instalación de dependencias del micro-servicio en cuestión. Evidenciamos así una de las grandes ventajas que nos brinda Docker y que hemos aprovechado para facilitarnos el provisionamiento en este caso.

> Puede consultar todos los detalles relativos a las opciones empleadas en el [playbook_productos](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/provision/playbook_provision_gp.yml) si desea obtener más información.

> Puede consultar todos los detalles relativos a las opciones empleadas en el [playbook_analisis](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/provision/playbook_provision_ar.yml) si desea obtener más información.

Por último, nos queda el playbook definido de cara al despliegue del servicio, donde hemos incluido las tareas relativas al inicio de la BD y ejecución de los contenedores provisionados de los micro-servicios.

> Puede consultar todos los detalles relativos a las opciones empleadas en el [playbook_deploy](https://github.com/yoskitar/Cloud-Computing-CC/blob/master/provision/playbook_deploy.yml) si desea obtener más información.

Una vez tenemos definidos cada uno de los playbooks necesarios, además del resto de fichero de configuración, sin olvidar incluir los roles empleados en la ruta `./roles`, podemos desplegar nuestro servicio empleando `vagrant up`, sin necesidad de ejecutar ansible de manera adicional, gracias a que hemos usado la opción que ofrece vagrant de provisionar desde el vagrantfile.

Tras ejecutar dicha orden, podremos conectarnos al servicio empleando las rutas habituales en el navegador:
* Gestión de productos -> localhost:8080/graphql
* Análisis de recetas -> localhost:8000/receipes

Además, podremos acceder a la máquina empleando el comando `vagrant ssh`, donde podemos comprobar que todo funciona correctamente.

## Análisis de prestaciones

Al igual que se realizó en anteriores ocasiones, realiaremos un análisis de las pretaciones del servicio desplegado en la máquina virtual. Para ello, consideraremos como objetivo el mismo nivel de prestaciones que se estableción en anteriores casos, de 10 usuarios simultáneos y 1000 peticiones/s. 

Emplearemos los mismos tests definidos para los anteriores experimentos desarrollados, junto con la herramienta Taurus.

Para el micro-servicio de gestión de productos obtuvimos los siguientes resultados:

![Resultados prestaciones gp](https://raw.githubusercontent.com/yoskitar/Cloud-Computing-CC/master/Justificaciones/imagenes/test_10u_gp_vm.png)

Como se observa, aunque no se obtienen las prestaciones indicadas, el resultado no llega a ser del todo lamentable en comparación con las primeras experimentaciones realizadas con la base de datos como servicio remoto. EL tiempo de respuesta se ha visto incrementado respecto a la ejecución local del servicio. Quizás se deba a la introducción de esa capa de virtualización. Podríamos considerar para tratar de aumentar los resultados obtenidos, ejecutar más instancias del contenedor, ya que puede que sea uno de los causantes de este resultado.

Para el micro-servicio de gestión de productos obtuvimos los siguientes resultados:

![Resultados prestaciones ar](https://raw.githubusercontent.com/yoskitar/Cloud-Computing-CC/master/Justificaciones/imagenes/test_10u_ar_vm.png)

Como ocurrió en experimentaciones anteriores, el micro-servicio de análisis de recetas presenta resultados ligeramente mejores. En este caso acercándonos más a las 1000 peticiones/s. Los tiempos de respuesta si son notablemente mejores que para el primer micro-servicio, lo que también puede estar justificado por la cantidad de atributos solicitados en el anterior caso.

Destacamos además el comportamiento de la carga de hits/s, que muestra un patrón regular, cayendo drásticamente sobre 300 hits/s para después volver a alcanzar unos 1300 hits/s, oscilando regularmente entre estos valores. Desconozco que puede llevar a esto, habiendo realizado experimentos con un mayor número de usuarios simultáneos, y repitiéndose el mismo patrón. Pensé que pudiera ser debido a una limitación por defecto de la máquina virtual o del docker, pero en dicho caso, el patrón se mantendría entorno a los mismos valores de oscilación. 

