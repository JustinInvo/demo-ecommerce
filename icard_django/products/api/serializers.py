from rest_framework.serializers import ModelSerializer
from products.models import Product
from categories.api.serializers import CategorySerializers

class ProductSerializer(ModelSerializer):
    category_data = CategorySerializers(source='category', read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'title', 'image', 'price', 'active', 'category', 'category_data']