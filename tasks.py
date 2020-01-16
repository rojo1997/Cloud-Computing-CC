from invoke import task

@task 
def start(ctx, ms='all'):
    if(ms=='all'):
        ctx.run("npm start & gunicorn --chdir src app:api & python src/analyzer.py")
    if(ms=='gp'):
        ctx.run("npm start")
    if(ms=='ar'):
            ctx.run("gunicorn --chdir src app:api & python src/analyzer.py")
        
        

@task
def test(ctx, ms='all'):
    if(ms=='all'):
        ctx.run("npm test & coverage run -m unittest src/test")
    if(ms=='gp'):
        ctx.run("npm test")
    if(ms=='ar'):
        ctx.run("coverage run -m unittest src/test/app_test.py")