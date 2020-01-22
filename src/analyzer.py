import pika
import os
import json
from dotenv import load_dotenv
from app import receipes

#Cargamos las variables de entorno para obtener la dirección 
#del servidor AMQP.
load_dotenv()

#Creamos la conexión con el server AMQP.
connection = pika.BlockingConnection(pika.URLParameters(
    os.getenv("URI_AMQP_SERVER")))   
channel = connection.channel()

#Definimos una función callback que será llamada al recibir 
#un mensaje de la cola.
def analyze(ch, method, properties, body):
    #Obtenemos los datos correspondientes al mensaje recibido
    #en la cola, enviados por el micro-servicio de gestión
    #de productos.
    data = body.decode()
    dataJSON = json.loads(data)
    res = receipes.get('byIngredients',dataJSON)
    #Obtenemos si hay alguna receta disponible con los ingredientes
    #recibidos y enviamos una alerta a la cola correspondiente con
    #el objetivo de generar recomendaciones de productos.
    #Para ello volvemos a establecer una conexión con el servidor,
    #creando la cola correspondiente y enviando la respuesta a la cola,
    #donde el micro-servicio correspondiente se encargará de procesar
    #dichos mensajes.
    connectionSend = pika.BlockingConnection(pika.URLParameters(
    os.getenv("URI_AMQP_SERVER"))) 
    channelSend = connectionSend.channel()
    channelSend.queue_declare(queue='alerts_queue')
    channelSend.basic_publish(exchange='',
                      routing_key='alerts_queue',
                      body=str(res))
    #Por último, cerramos la conexión.
    connectionSend.close()

#Establecemos la cola y la función callback definidas.
channel.basic_consume(queue='analyze_queue', on_message_callback=analyze,auto_ack=True)
#Comenzamos a escuchar en el canal configurado.
print("Waiting for products...")
#Comenzamos a consumir los datos escuchando en la cola definida.
channel.start_consuming()