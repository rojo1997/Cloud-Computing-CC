from invoke import task

@task 
def start(ctx, ms='all', w=4, p=3003):
    if(ms=='all'):
        ctx.run("npm start & " + "gunicorn -w " + str(w) + " -b :" + str(p) + " --chdir src app:api & python src/analyzer.py")
    if(ms=='gp'):
        ctx.run("npm start")
    if(ms=='ar' and p != 3003):
        ctx.run("gunicorn -w " + str(w) + " -b :" + str(p) + " --chdir src app:api & python src/analyzer.py")
    else:
        ctx.run("gunicorn -w " + str(w) + " --chdir src app:api & python src/analyzer.py")

        

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

