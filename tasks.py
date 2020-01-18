from invoke import task

@task 
def start(ctx, ms='all'):
    if(ms=='all'):
        ctx.run("npm start & gunicorn --chdir src app:api & python src/analyzer.py")
    if(ms=='gp'):
        ctx.run("npm start")
    if(ms=='ar'):
            ctx.run("gunicorn -w 4 -b 0.0.0.0:8080 --chdir src app:api & python src/analyzer.py")
        
        

@task
def test(ctx, ms='all'):
    if(ms=='all'):
        ctx.run("npm test & coverage run -m unittest src/test/app_test.py")
    if(ms=='gp'):
        ctx.run("npm test")
    if(ms=='ar'):
        ctx.run("coverage run -m unittest src/test/app_test.py")

@task
def install(ctx, ms='all'):
    if(ms=='all'):
        ctx.run("npm install --production & pip install requirements.txt")
    if(ms=='gp'):
        ctx.run("npm install --production")
    if(ms=='ar'):
        ctx.run("pip install -r requirements.txt")

