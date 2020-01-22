from falcon import testing, HTTP_200, HTTP_201, HTTP_400, HTTP_501
import sys
#Testeamos desde la ruta principal, donde está alojado el tasks.py
sys.path.append("src/")
from app import api

#Testeamos el micro-servicio de análisis de recetas con el módulo
#testing del framework falcon.
class Tester(testing.TestCase):
    def setUp(self):
        super(Tester,self).setUp()
        #Asignamos el módulo api importado de la clase donde
        #hemos instanciado el APIrest con falcon.
        self.app = api
    
#Definimos las funciones de test sobre los diferentes recursos y métodos
#definidos para cada uno de ellos.
class TestApp(Tester):
    #Función para testear la obtención de todas las recetas disponibles
    def test_get_products(self):
        result = self.simulate_get('/receipes?method=receipes&value=all')
        self.assertEqual(result.status, HTTP_200)

    #Función para testear la obtención de una receta atendiendo a su identificador
    def test_get_productById(self):
        result = self.simulate_get('/receipes?method=byId&value=5e20e60d6859cdc7b2517b60')
        self.assertEqual(result.status, HTTP_200)
        self.assertEqual(result.json['name'], "Pollo con almendras")

    #Función para testear la obtención de recetas atendiendo a sus ingredientes
    def test_get_productByIngredients(self):
        result = self.simulate_get('/receipes?method=byIngredients&value=almendras&value=setas')
        self.assertEqual(result.status, HTTP_200)
        self.assertEqual(result.json[0]['name'], "Pollo con almendras")

    #Función para testear la llamada de un método no definido sobre el recurso get
    def test_get_notDefined(self):
        result = self.simulate_get('/receipes?method=notDefinded&value=something')
        self.assertEqual(result.status, HTTP_501)

    #Función para testear el recurso get con un valor de identificador de receta inexistente
    def test_get_notFound(self):
        result = self.simulate_get('/receipes?method=byId&value=5e40e60d6859cdc7b2517b60')
        self.assertEqual(result.status, HTTP_400)

    #Función para testear el recurso post para la inserción de una nueva receta
    def test_post(self):
        #testReceipe = dict(name='Receta de test', ingredients=['Ingrediente de test 1', 'Ingrediente de test 1'])
        result = self.simulate_post('/receipes', json={"name": "Test", "ingredients":["ingrediente 1", "ingrediente 2", "ingrediente 3"]}, headers={'content-type': 'application/json'})
        self.assertEqual(result.status, HTTP_201)