import json
import boto3
import uuid
from datetime import datetime

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('postsData')

def lambda_handler(event, context):
    try:
        body = json.loads(event.get('body', '{}'))

        tag = body.get('tag')
        title = body.get('title')
        content = body.get('content')

        if not tag or not title or not content:
            return {
                'statusCode': 400,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type'
                },
                'body': json.dumps({'message': 'Missing required fields'})
            }

        post = {
            'postid': str(uuid.uuid4()),  # 🔑 FIXED HERE
            'tag': tag.lower(),
            'title': title,
            'content': content,
            'createdAt': datetime.utcnow().isoformat()
        }

        table.put_item(Item=post)

        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': json.dumps({
                'message': 'Post created successfully',
                'postid': post['postid']
            })
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
