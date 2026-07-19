import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/products.js";
import { Form, message, Button, Input, InputNumber, Select, Card } from "antd";

function ProductEditPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [form] = Form.useForm();
  const imageUrl = Form.useWatch("imageUrl", form);

  useEffect(() => {
    if (!isEdit) return;
    const fetchProduct = async () => {
      try {
        const res = await getProductById(id);
        form.setFieldsValue(res.data);
      } catch (error) {
        message.error("Fail to get product data!");
      }
    };
    fetchProduct();
  }, [id]);
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <Card style={{ width: 600, margin: "40px auto" }}>
      <h2>{isEdit ? "Edit Product" : "Create Product"}</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Product Name"
          rules={[{ required: true, message: "Please input product name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Product Description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="category" label="Category">
          <Select
            allowClear
            placeholder="Select a category"
            options={[
              { value: "electronics", label: "Electronics" },
              { value: "clothing", label: "Clothing" },
              { value: "books", label: "Books" },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[
            { required: true, message: "Please input price" },
            { type: "number", min: 0, message: "Price must be at least 0" },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="stock"
          label="In Stock Quantity"
          rules={[
            {
              required: true,
              message: "Please input current in stock quantity",
            },
            {
              type: "number",
              min: 0,
              message: "In stock quantity must be at least 0",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="imageUrl"
          label="Add Image Link"
          rules={[{ type: "url", message: "Please enter a valid URL" }]}
        >
          <Input placeholder="http://" />
        </Form.Item>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="preview"
            style={{ width: 200, height: 200, objectFit: "cover" }}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {isEdit ? "Edit Product" : "Add Product"}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default ProductEditPage;
