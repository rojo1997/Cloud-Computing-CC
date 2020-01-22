from invoke import task

#En cada una de las tareas, el primer argumento hace referencia al contexto
#de ejecución, que por convención suele denominarse c, ctx o context.

#Tarea definida para la ejecución del servicio desarrollado.
#Si no se especifica, se ejecutará el servicio completo.
#Opción --ms: indicar el micro-servicio a testear:
#   gp: ms de gestión de productos.
#   ar: ms de análisis de recetas.
#Opción -w: indicar el número de workers para gunicorn.
#   Valor por defecto: 4 workers.
#Opción -p: indicar el puerto sobre el que se lanzará el ms.
#   Valor por defecto: puerto habilitado por defecto en el servicio o 
#       plataforma donde ha sido desplegado.
@task 
def start(ctx, ms='all', w=4, p=-1):
    if(ms=='all' and p != -1):
        ctx.run("npm start & " + "gunicorn -w " + str(w) + " -b :" + str(p) + " --chdir src app:api & python src/analyzer.py")
    else:
        ctx.run("npm start & " + "gunicorn -w " + str(w) + " --chdir src app:api & python src/analyzer.py")
    if(ms=='gp'):
        ctx.run("npm start")
    if(ms=='ar' and p != -1):
        ctx.run("gunicorn -w " + str(w) + " -b :" + str(p) + " --chdir src app:api & python src/analyzer.py")
    else:
        ctx.run("gunicorn -w " + str(w) + " --chdir src app:api & python src/analyzer.py")

        
#Tarea definida para la realización de los tests y reportes de cobertura
#de los micro-servicios desarrollados.
#Si no se especifica, se realizarán los tests del servicio completo.
#Opción --ms: indicar el micro-servicio a testear:
#   gp: ms de gestión de productos.
#   ar: ms de análisis de recetas.
@task
def test(ctx, ms='all'):
    if(ms=='all'):
        ctx.run("npm test & coverage run -m unittest src/test/app_test.py")
    if(ms=='gp'):
        ctx.run("npm test")
    if(ms=='ar'):
        ctx.run("coverage run -m unittest src/test/app_test.py")

#Tarea definida para la instalación de las dependencias necesarias
#para los micro-servicios desarrollados.
#Si no se especifica, instalará las dependecias necesarias para la 
#ejecución del servicio completo.
#Opción --ms: indicar las dependencias del micro-servicio a instalar:
#   gp: ms de gestión de productos.
#   ar: ms de análisis de recetas.
@task
def install(ctx, ms='all'):
    if(ms=='all'):
        ctx.run("npm install --production & pip install requirements.txt")
    if(ms=='gp'):
        ctx.run("npm install --production")
    if(ms=='ar'):
        ctx.run("pip install -r requirements.txt")

