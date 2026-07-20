import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProductById,
  editProduct,
  createProduct,
  deleteProduct,
} from "../api/products.js";
import {
  Form,
  message,
  Button,
  Input,
  InputNumber,
  Select,
  Card,
  Popconfirm,
} from "antd";
import { PictureOutlined } from "@ant-design/icons";

function ProductEditPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [form] = Form.useForm();
  const imageUrl = Form.useWatch("imageUrl", form);
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const previewClass = "w-full h-50 object-cover mb-3";

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

  const onFinish = async (values) => {
    setSubmitting(true);
    try {
      if (isEdit) {
        await editProduct(id, values);
        message.success("Successfully updated the product!");
        navigate(`/products/${id}`);
      } else {
        await createProduct(values);
        message.success("Successfully created the product!");
        navigate("/");
      }
    } catch (error) {
      message.error(
        error.response?.data?.message ||
          (isEdit ? "Failed to update product" : "Failed to create product"),
      );
    } finally {
      setSubmitting(false);
    }
  };
  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteProduct(id);
      message.success("You have successfully deleted the product!");
      navigate("/");
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to delete the product",
      );
    } finally {
      setDeleting(false);
    }
  };
  return (
    <div className="flex-1 flex flex-col justify-center items-center px-2 py-2">
      <h1 className="mb-3 ">{isEdit ? "Edit Product" : "Create Product"}</h1>
      <Card className="w-full md:max-w-[660px]">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
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
                {
                  required: true,
                  message: "Please input a proper price number",
                },
                { type: "number", min: 0, message: "Price must be at least 0" },
              ]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
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
                {
                  type: "integer",
                  message: "Quantity must be an integer number",
                },
              ]}
            >
              <InputNumber min={0} precision={0} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name="imageUrl"
              label="Add Image Link"
              rules={[{ type: "url", message: "Please enter a valid URL" }]}
            >
              <Input placeholder="http://" />
            </Form.Item>
          </div>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="preview"
              className={previewClass}
              onLoad={(e) => {
                e.target.style.display = "block";
              }}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          ) : (
            <div
              className={`${previewClass} border-2 border-dashed rounded flex flex-col items-center justify-center text-border`}
            >
              <PictureOutlined className="text-2xl mb-1" />
              Image preview!
            </div>
          )}
          <Form.Item>
            <div className="flex justify-between">
              <Button type="primary" htmlType="submit" loading={submitting}>
                {isEdit ? "Edit Product" : "Add Product"}
              </Button>
              {isEdit && (
                <Popconfirm
                  title="Delete this product?"
                  description="This can't be undone. The product will be removed from the store immediately."
                  onConfirm={handleDelete}
                  okText="Delete"
                  cancelText="Cancel"
                  okButtonProps={{ danger: true, loading: deleting }}
                >
                  <Button type="primary" danger>
                    Delete Product
                  </Button>
                </Popconfirm>
              )}
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default ProductEditPage;
