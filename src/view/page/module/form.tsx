import React from 'react';
import { Button, Form } from 'antd';
// import { Upload } from '@netease-ehr/base';
import {
    Name,
    Phone,
    Email
    // Department,
    // Teachers,
    // CourseSection,
    // CourseClass,
    // RangePicker,
    // DatePicker,
    // ProjectConfig,
    // CreditCourse,
    // CreditLearning,
    // CreditWork,
    // CreditExam
} from '@/components/business/form-field';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
};

const list = [
    {
        courseCode: '1',
        courseName: '1',
        requiredFlag: true,
        creditPoints: null,
        homeworkCreditPoints: 1.5,
        idpCreditPoints: 2.5,
        examCreditPoints: 3.5
    },
    {
        courseCode: '2',
        courseName: '2',
        requiredFlag: false,
        creditPoints: 0.5,
        homeworkCreditPoints: 1.5,
        idpCreditPoints: 2.5,
        examCreditPoints: 3.5
    },
    {
        courseCode: '3',
        courseName: '3',
        requiredFlag: true,
        creditPoints: 0.5,
        homeworkCreditPoints: 1.5,
        idpCreditPoints: 2.5,
        examCreditPoints: 3.5
    }
];

export default () => {
    const [form] = Form.useForm();

    return (
        <>
            <Button
                style={{ marginBottom: 20 }}
                type="primary"
                onClick={() => {
                    form.setFieldsValue({
                        appoint: {
                            enrollAreas: [{ code: '020', name: '杭1州' }]
                        },
                        projectConfig: { course: list },
                        trainRefList: list,
                        examRefList: list,
                        homeworkRefList: list,
                        mediaRefList: list,
                        name: 'zz'
                    });
                }}
            >
                点击按钮信息回填
            </Button>
            <Form
                {...layout}
                name="basic"
                form={form}
                onValuesChange={(value, all) => {
                    console.log(all);
                }}
                onFinish={values => console.log(values)}
            >
                {/* <Form.Item name="file" label="上传文件夹">
                    <Upload directory />
                </Form.Item>
                <Appoint name="appoint" required /> */}
                <Name name="name" required />
                <Phone name="phone" required />
                <Email name="email" required />
                {/* <Department name="dept" required />
                <Department name="dept11" required multiple />
                <Teachers name="teachers" required />
                <CourseClass name="courseClass" required />
                <RangePicker name="rangePick" onChange={value => console.log(value)} />
                <DatePicker name="datePicker" timestamp onChange={value => console.log(value)} />
                <CourseSection name="courseSection" wrapperCol={{ offset: 8 }} />
                <CreditCourse name="trainRefList" labelCol={{ span: 0 }} wrapperCol={{ span: 24 }} />
                <CreditLearning name="mediaRefList" labelCol={{ span: 0 }} wrapperCol={{ span: 24 }} />
                <CreditWork name="homeworkRefList" labelCol={{ span: 0 }} wrapperCol={{ span: 24 }} />
                <CreditExam name="examRefList" labelCol={{ span: 0 }} wrapperCol={{ span: 24 }} />
                <ProjectConfig name="projectConfig" required wrapperCol={{ span: 24 }} /> */}
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
};
