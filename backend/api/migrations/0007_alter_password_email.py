# Generated by Django 4.1.7 on 2023-04-07 22:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_users_last_login'),
    ]

    operations = [
        migrations.AlterField(
            model_name='password',
            name='email',
            field=models.CharField(default='null', max_length=100),
        ),
    ]
