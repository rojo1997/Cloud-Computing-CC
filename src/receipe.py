# -*- coding: utf-8 -*-

import falcon
import json
import sys
from bson import ObjectId
from falcon import HTTP_400, HTTP_501
from dotenv import load_dotenv


class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)

class Receipe(object):
    def __init__(self, dbManager):
        self.dbManager = dbManager
    
    def get(self, method, paramValue):
        #Estrutura de respuesta 
        res = {
            "status": HTTP_400, #Bad request
            "data": None,
            "msg": "Default"
        }

        if(method == 'receipes'):
            res = self.dbManager.get()
        elif(method == 'byId'):
            res = self.dbManager.get(param='id', value=paramValue)
        elif(method == 'byIngredients'):
            if(isinstance(paramValue,list)):
                res = self.dbManager.get(param='ingredients', value=paramValue)
            else:
                res['msg'] = 'Error: Value need to be a list of ingredients for look for ingredients'
        else:
            res['status'] = HTTP_501 #Método no implementado
            res['msg'] = 'Error: method not implemented'

        return res

    def post(self, data):
        #Estrutura de respuesta 
        res = {
            "status": HTTP_400, #Bad request
            "data": None,
            "msg": "Default"
        }

        #Comprobamos si el json recibido esta bien formado
        if ('name' in data and 'ingredients' in data):
            ingredientsValue = data['ingredients']
            if(isinstance(ingredientsValue,list)):
                newReceipe = dict(name=data['name'], ingredients=ingredientsValue)
                res = self.dbManager.insert(newReceipe)
            else:
                res['msg'] = "Invalid query params type"
        else:
            res['msg'] = "Invalid query params"

        return res

    def on_get(self, req, resp):
        # Handles GET requests
        methodParam = req.params['method'] or ""
        valueParam = req.params['value'] or ""
        res = self.get(method=methodParam, paramValue=valueParam)
        
        resp.status = res['status']
        resp.body = JSONEncoder().encode(res['data'])

    def on_post(self, req, resp):
        data = json.loads(req.stream.read(sys.maxsize).decode('utf-8'))
        res = self.post(data=data)

        resp.status = res['status']
        resp.body = JSONEncoder().encode(res['data'])

