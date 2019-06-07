def lambda_handler(event, context):
    print(event)
    import json
    from botocore.vendored import requests
    import string
    response = requests.get('https://api.bibox.com/v1/mdata?cmd=marketAll')
    responsetext = response.text
    input = int(event['input'])
    # print(responsetext)
    # print(type(responsetext))
    d = json.loads(responsetext)
    
    def response(message, status_code):
        return {
            'statusCode': str(status_code),
            'body': json.dumps(message),
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
                },
            }

    for pair in d['result']:
        if pair["coin_symbol"] == "BIX":
            print(pair)
            last_usd=float(pair["last_usd"])
            print(last_usd)
            currentBiboxWorth = last_usd * input
            print(currentBiboxWorth)
            return response({'value': currentBiboxWorth}, 200)
            
    
    
        