# -*- coding: utf-8 -*-

import falcon
import os
from receipe import Receipe
from dbManager import DbManager
from dotenv import load_dotenv


# falcon.API instances are callable WSGI apps
api = falcon.API()

load_dotenv()
dbReceipesManager = DbManager(os.getenv("DB_RECEIPES"),'ReceipesDB','receipes')

# Resources are represented by long-lived class instances
receipes = Receipe(dbReceipesManager)

# things will handle all requests to the '/things' URL path
api.add_route('/receipes', receipes)


