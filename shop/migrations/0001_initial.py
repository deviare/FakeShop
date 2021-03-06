# Generated by Django 3.1.7 on 2021-03-21 13:25

from django.db import migrations, models
import shop.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30, unique=True)),
                ('price', models.DecimalField(decimal_places=2, max_digits=6)),
                ('image', models.ImageField(upload_to=shop.models.rename_image)),
                ('description', models.TextField(default='item desc')),
            ],
        ),
    ]
