# Generated by Django 4.1.7 on 2023-04-07 16:21

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_users_last_login_alter_users_date_joined'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='MotherPwd',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='users',
            name='date_joined',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='users',
            name='email',
            field=models.EmailField(max_length=100, unique=True),
        ),
        migrations.AlterField(
            model_name='users',
            name='last_login',
            field=models.DateTimeField(blank=True),
        ),
        migrations.AlterField(
            model_name='users',
            name='nom',
            field=models.CharField(max_length=30),
        ),
        migrations.AlterField(
            model_name='users',
            name='prenom',
            field=models.CharField(max_length=30),
        ),
    ]
