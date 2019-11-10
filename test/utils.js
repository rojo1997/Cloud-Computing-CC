const formatErrors = require('../utils/utils')
const expect = require("chai").expect;

describe("Test de Utils", function(){
    describe("Should pass if the function formatErrors return expected message", function(){
        it("Valid errors format", function(){
            var error = {
                errors: {
                    name: {
                        path:'name', 
                        message:'Debe contener entre 2 y 20 caracteres.'
                    }
                }
            };

            var otherErrors = [
                {
                    path: "[Update product state]", 
                    message: "Product not found"
                }
            ];
            const errorFormated = formatErrors(error,otherErrors);
            expect(errorFormated.length).to.equal(2);
        })

        it("Valid only otherErrors format", function(){
            var otherErrors = [
                {
                    path: "[Update product state]", 
                    message: "Product not found"
                }
            ];

            const errorFormated = formatErrors([],otherErrors);
            expect(errorFormated).to.equal(otherErrors);
        })

        it("Valid unknown error", function(){
            
            const errorFormated = formatErrors([],[]);
            expect(errorFormated[0].path).to.equal('Desconocido');
        })
    })
})

