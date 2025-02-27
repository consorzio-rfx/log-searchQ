from marshmallow import Schema, fields, validate

class UserSchema(Schema):
    id = fields.Int(dump_only=True)  # This field is only used for output
    username = fields.Str(required=True, validate=validate.Length(min=1, max=30))
    email = fields.Email(required=True)