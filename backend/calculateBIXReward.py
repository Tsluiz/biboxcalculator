def lambda_handler(event, context):
    print(event)
    import json
    from botocore.vendored import requests
    import string
    biboxTransactionPercentage = 0.001
    response = requests.get('https://api.bibox.com/v1/mdata?cmd=marketAll')
    responsetext = response.text
    input = int(event['input'])
    # print(responsetext)
    # print(type(responsetext))
    d = json.loads(responsetext)
    totalvol24hinUSD = 0
    for pair in d['result']:
        # print(pair)
        vol24H=float(pair["vol24H"])
        # print("24hour trading volume: " + str(vol24H))
        last_usd=float(pair["last_usd"])
        # print("Last transaction in USD: " + str(last_usd))
        vol24HinUSD=vol24H*last_usd
        # print("24hour trading volume in USD: " + str(vol24HinUSD))
        totalvol24hinUSD += vol24HinUSD
    print("Total volume of last 24 hours in USD: " + str(totalvol24hinUSD))
    
    biboxprofit = totalvol24hinUSD * biboxTransactionPercentage
    print("Bibox profit last 24 hours in USD: " + str(biboxprofit))
    fractionOfBiboxCoins = input / 130000000
    print("Your fraction of the circulating supply is: " + str(fractionOfBiboxCoins))
    yourReward = fractionOfBiboxCoins * biboxprofit * 0.3
    print("You have " + str(input) + "BIX")
    print("Your reward in USD per 24 hours: " + str(yourReward))
    
    def response(message, status_code):
        return {
            'statusCode': str(status_code),
            'body': json.dumps(message),
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
                },
            }
    
    
    return response({'reward': yourReward}, 200)
    
