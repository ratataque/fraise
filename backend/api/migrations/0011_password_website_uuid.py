# Generated by Django 4.1.7 on 2023-04-10 15:23

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_alter_password_uuid'),
    ]

    operations = [
        migrations.AddField(
            model_name='password',
            name='website_uuid',
            field=models.UUIDField(default=uuid.uuid4),
        ),
    ]
