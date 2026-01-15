import json
import boto3 # type: ignore

# DynamoDB resource (same region as Lambda)
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('postsData')

def lambda_handler(event, context):
    try:
        # Get postid from path parameters
        postid = event.get('pathParameters', {}).get('postid')

        if not postid:
            return {
                'statusCode': 400,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type'
                },
                'body': json.dumps({'message': 'postid is required'})
            }

        # Delete item from DynamoDB
        table.delete_item(
            Key={'postid': postid}
        )

        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': json.dumps({'message': 'Post deleted successfully'})
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
