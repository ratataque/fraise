# Generated by Django 4.1.7 on 2023-04-10 15:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_password_uuid_alter_password_email_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='password',
            name='uuid',
            field=models.UUIDField(),
        ),
    ]