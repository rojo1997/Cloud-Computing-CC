# -*- coding: utf-8 -*-

import pymongo
from bson.objectid import ObjectId
import json
from falcon import HTTP_200, HTTP_201, HTTP_400
from bson import json_util

class DbManager:
    def __init__(self,URI,db,collection):
        myclient = pymongo.MongoClient(URI)
        mydb = myclient[db]
        self.collection = mydb[collection]

    def get(self,param='all',value='all'):
        resp = {
            "status": HTTP_200, 
            "data": None,
            "msg": "Success"
        }

        lista = True
        try:
            if(param == 'all'):
                res = self.collection.find()
            elif(param == 'id'):
                res = self.collection.find_one({'_id':ObjectId(value)})
                lista=False
            elif(param == 'ingredients'):
                res = self.collection.find({'ingredients':{'$elemMatch':{'$in':value}}})
            else: 
                res = self.collection.find({param:value})
        except Exception as ex:
            self.logger.error(ex)

        if(res == None):
            resp['msg']="Error"
            resp['status']=HTTP_400
        else:
            if(lista):
                docs=[]
                for doc in res:
                    docs.append(doc)
                resp['data']=docs
            else:
                resp['data']=res

        return resp

    def insert(self,newReceipe):
        resp = {
            "status": HTTP_201, 
            "data": None,
            "msg": "Success"
        }

        lista = True
        try:
            res = self.collection.insert_one(newReceipe).inserted_id
        except Exception as ex:
            self.logger.error(ex)

        if(res == None):
            resp['msg']="Error"
            resp['status']=HTTP_400
        else:
            resp['data']=res

        return resp
       
            
    