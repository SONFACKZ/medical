import React, { Component } from 'react'
import { Form, Input, Button, Space, Select } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

const onFinish = values => {
    console.log('Received values of form:', values);
  };

  const { Option } = Select;

  const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function handleChange(value) {
  console.log(`Selected: ${value}`);
}


export class ConsultationForm extends Component {
    render() {
        return (
            <div>
                 <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
      <Form.List name="symptoms">
        {(fields, { add, remove }) => (
          <>
            {fields.map(field => (
              <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...field}
                  name={[field.name, 'symptom']}
                  fieldKey={[field.fieldKey, 'symptom']}
                  rules={[{ required: true, message: 'Missing symptom name' }]}
                >
                  <Input placeholder="Symptom Name" />
                </Form.Item>
                {/* <Form.Item
                  {...field}
                  name={[field.name, 'last']}
                  fieldKey={[field.fieldKey, 'last']}
                  rules={[{ required: true, message: 'Missing last name' }]}
                >
                  <Input placeholder="Last Name" />
                </Form.Item> */}
                <MinusCircleOutlined onClick={() => remove(field.name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>





    <Select
        mode="multiple"
        size='large'
        placeholder="Please select your symptoms"
        defaultValue={['a10', 'c12']}
        onChange={handleChange}
        style={{ width: '100%' }}
      >
        {children}
      </Select>
            </div>
        )
    }
}

export default ConsultationForm
