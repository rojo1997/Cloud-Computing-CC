# -*- coding: utf-8 -*-
import pymongo
from bson.objectid import ObjectId
from falcon import HTTP_200, HTTP_201, HTTP_400

#Definición de la clase para la gestión de la BD.
class DbManager:
    #Inicializamos la instancia estableciendo la BD y 
    #colección sobre la que trabajaremos.
    def __init__(self,URI,db,collection):
        myclient = pymongo.MongoClient(URI)
        mydb = myclient[db]
        self.collection = mydb[collection]

    #Método para la obtención de documentos de la colección
    #establecida, atendiendo al valor de 'param' en el que se
    #especifica qué metodo de consulta ejecutar, y con que valor,
    #indicado en el parámetro 'value'.
    def get(self,param='all',value='all'):
        #Definción de respuesta por defecto.
        resp = {
            "status": HTTP_200, 
            "data": None,
            "msg": "Success"
        }

        lista = True
        try:
            #Obtener todos los documentos de la colección.
            if(param == 'all'):
                res = self.collection.find()
            #Obtener un documento dado un identificador.
            elif(param == 'id'):
                res = self.collection.find_one({'_id':ObjectId(value)})
                lista=False
            #Obtener un documento dado un nombre de ingrediente.
            elif(param == 'ingredients'):
                res = self.collection.find({'ingredients':{'$elemMatch':{'$in':value}}})
            #Obtener un documento dado otro parámetro.
            else: 
                res = self.collection.find({param:value})
        except Exception as ex:
            self.logger.error(ex)
        
        #Gestionar errores en la consulta.
        if(res == None):
            resp['msg']="Error"
            resp['status']=HTTP_400
        else:
            #Componemos la respuesta de forma adecuada
            if(lista):
                docs=[]
                for doc in res:
                    docs.append(doc)
                resp['data']=docs
            else:
                resp['data']=res

        return resp

    #Método para la inserción de recetas en la colección establecida.
    def insert(self,newReceipe):
        #Definición de respuesta por defecto.
        resp = {
            "status": HTTP_201, 
            "data": None,
            "msg": "Success"
        }

        #Insertamos en la colección el documento recibido y preparamos 
        #la respuesta.
        try:
            res = self.collection.insert_one(newReceipe).inserted_id
        except Exception as ex:
            self.logger.error(ex)

        #Modificamos el estado y el mensaje en caso de producirse un error
        #en la inserción.
        if(res == None):
            resp['msg']="Error"
            resp['status']=HTTP_400
        else:
            #Devolvemos el identificador de la receta insertada como 
            #campo data de la respuesta.
            resp['data']=res

        return resp
       
            
    