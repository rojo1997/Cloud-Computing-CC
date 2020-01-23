# -*- coding: utf-8 -*-
import falcon
import json
import sys
from bson import ObjectId
from falcon import HTTP_400, HTTP_501

#Clase creada para procesar el campo 'data' que será devuelto
#como parte del 'body' en la respuesta al request realizado.
class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        #Si es del tipo ObjectID, es necesario pasar la respuesta
        #a String para evitar errores.
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)

#Clase para la definición del recurso 'Receipe', encargado de
#gestionar las peticiones al endpoint '/receipes'.
class Receipe(object):
    #Establecemos el manejador de la BD para respetar la
    #'Single source of truth'.
    def __init__(self, dbManager):
        #Inyección de dependencia
        self.dbManager = dbManager
    
    #Método para procesar un petición Get.
    def get(self, method, paramValue):
        #Estrutura de respuesta por defecto
        res = {
            "status": HTTP_400, #Bad request
            "data": None,
            "msg": "Default"
        }
        #Discriminamos el método indicado como parámetro
        #para realizar el get atendiendo al atributo deseado
        #del documento.
        if(method == 'receipes'):
            res = self.dbManager.get()
        elif(method == 'byId'):
            res = self.dbManager.get(param='id', value=paramValue)
        elif(method == 'byIngredients'):
            #Manejar error en caso de que la petición se encuentre mal formada
            if(isinstance(paramValue,list)):
                res = self.dbManager.get(param='ingredients', value=paramValue)
            else:
                res['msg'] = 'Error: Value need to be a list of ingredients for look for ingredients'
        #Manejar error en cado de llamar a un método no definido
        else:
            res['status'] = HTTP_501 #Método no implementado
            res['msg'] = 'Error: method not implemented'
        #Devolvemos la respuesta
        return res

    def post(self, data):
        #Estrutura de respuesta por defecto
        res = {
            "status": HTTP_400, #Bad request
            "data": None,
            "msg": "Default"
        }
        #Comprobamos si el json recibido esta bien formado
        if ('name' in data and 'ingredients' in data):
            ingredientsValue = data['ingredients']
            if(isinstance(ingredientsValue,list)):
                #Creamos un objeto diccionario con la estructura adecuada
                #para insertarlo como documento en la colección.
                newReceipe = dict(name=data['name'], ingredients=ingredientsValue)
                res = self.dbManager.insert(newReceipe)
            #Gestión de error de tipo incorrecto
            else:
                res['msg'] = "Invalid query params type"
        #Gestión de error de request mal formada
        else:
            res['msg'] = "Invalid query params"
        #Devolvemos la respuesta
        return res

    #Método que será llamado cuando se ejecute una petición
    #get sobre el el recurso para el API.
    def on_get(self, req, resp):
        #Obtenemos los parámetros como queryParams en el URL
        methodParam = req.params['method'] or ""
        valueParam = req.params['value'] or ""
        #Procesamos la petición
        res = self.get(method=methodParam, paramValue=valueParam)
        #Establecemos la respuesta
        resp.status = res['status']
        resp.body = JSONEncoder().encode(res['data'])

    #Método que será llamado cuando se ejecute una petición
    #post sobre el el recurso para el API.
    def on_post(self, req, resp):
        #Obtenemos los parámetros como json en el body de la petición
        data = json.loads(req.stream.read(sys.maxsize).decode('utf-8'))
        #Procesamos la petición
        res = self.post(data=data)
        #Establecemos la respuesta
        resp.status = res['status']
        resp.body = JSONEncoder().encode(res['data'])

