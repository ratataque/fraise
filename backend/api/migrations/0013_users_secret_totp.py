# Generated by Django 4.1.7 on 2023-04-18 16:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_alter_password_website_uuid'),
    ]

    operations = [
        migrations.AddField(
            model_name='users',
            name='secret_totp',
            field=models.EmailField(blank=True, max_length=100, null=True, unique=True),
        ),
    ]
