# Generated by Django 4.1.4 on 2022-12-10 17:22

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_alter_users_email'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='uuid',
            field=models.TextField(default=uuid.UUID('b583ce71-5d9b-4c3a-848d-c43de91674e6')),
        ),
    ]
