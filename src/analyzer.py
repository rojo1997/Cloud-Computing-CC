
import pika
import os
import base64
import json
from dotenv import load_dotenv
from app import receipes

load_dotenv()
#Creamos la conexión con el server AMQP
connection = pika.BlockingConnection(pika.URLParameters(
    os.getenv("URI_AMQP_SERVER")))   
channel = connection.channel()

#Definimos una función callback que será llamada al recibir 
#un mensaje de la loca
def analyze(ch, method, properties, body):
    data = body.decode()
    dataJSON = json.loads(data)
    res = receipes.get('byIngredients',dataJSON)
    data = {
            "name": "prueba de analyzer receiver", #Bad request
            "ingredients": ["producto de analyzer1", "producto 2"]
        }
    receipes.post(data)
    print(res['data'])

#Estalecemos la cola y la función callback definidas
channel.basic_consume(queue='analyze_queue', on_message_callback=analyze,auto_ack=True)
#Comenzamos a escuchar en el canal configurado
print("Waiting for products...")
channel.start_consuming()