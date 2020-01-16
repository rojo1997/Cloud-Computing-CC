
from falcon import testing, HTTP_200, HTTP_400

import sys
sys.path.append("src/")
from app import api

class Tester(testing.TestCase):
    def setUp(self):
        super(Tester,self).setUp()
        self.app = api
    
class TestApp(Tester):
    def test_get_products(self):
        result = self.simulate_get('/receipes?method=receipes&value=all')
        self.assertEqual(result.status, HTTP_200)
    
    def test_get_productById(self):
        result = self.simulate_get('/receipes?method=byId&value=5e19c8ab73b430389a823a14')
        self.assertEqual(result.status, HTTP_200)
        self.assertEqual(result.json['name'], "Pollo con almendras")

    def test_get_productByIngredients(self):
        result = self.simulate_get('/receipes?method=byIngredients&value=almendras&value=setas')
        self.assertEqual(result.status, HTTP_200)
        self.assertEqual(result.json[0]['name'], "Pollo con almendras")