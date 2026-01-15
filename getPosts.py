import json
import boto3 # type: ignore

# DynamoDB resource (same region as Lambda)
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('postsData')

def lambda_handler(event, context):
    try:
        # Fetch all posts
        response = table.scan()
        posts = response.get('Items', [])

        # Sort posts by newest first
        posts.sort(key=lambda x: x.get('createdAt', ''), reverse=True)

        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': json.dumps(posts)
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': json.dumps({'error': str(e)})
        }
