def getUrl():
    return 'https://exercisedb.p.rapidapi.com/exercises'

def getHeaders():
    headers = {
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
        'X-RapidAPI-Key': '56e056fbc8msh7068f13bbc68e00p130510jsn9f488476d056'
    }
    return headers

def getParams():
    params = {
        'limit': '50',
        'lang': 'pt-BR'
    }
    return params
