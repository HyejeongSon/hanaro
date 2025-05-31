'use client';

// import { ChangeEvent, useActionState, useEffect } from "react";
// import toast from "react-hot-toast";
import { Input } from '../ui/input';
// import { FormMessage } from "./FormMessage";
import { Label } from '../ui/label';
import { FormCard } from './FormCard';
import { Submit } from './Submit';

export function SignUpForm() {
  //   const [error, action] = useActionState(signUp, undefined);
  //   const { errors, validateField } =
  //     useFormValidate<TSignUpFormError>(SignUpSchema);

  //   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  //     const { name, value } = event.target;
  //     validateField(name, value);
  //   };

  //   useEffect(() => {
  //     if (error?.errorMessage) {
  //       toast.error(error.errorMessage);
  //     }
  //   }, [error]);

  return (
    <FormCard
      title='회원가입'
      footer={{ label: '이미 계정이 있으신가요?', href: '/login' }}
    >
      <form
        // action={}
        className='space-y-6'
      >
        {/* 이름 */}
        <div className='space-y-2'>
          <Label htmlFor='name'>이름</Label>
          <Input
            id='name'
            name='name'
            placeholder='이름을 입력해주세요'
            // onChange={handleChange}
          />
          {/* {errors?.name && <FormMessage message={errors?.name[0]} />} */}
        </div>

        {/* 이메일 */}
        <div className='space-y-2'>
          <Label htmlFor='email'>이메일</Label>
          <Input
            id='email'
            name='email'
            type='email'
            placeholder='hanaro@email.com'
            // onChange={handleChange}
          />
          {/* {errors?.email && <FormMessage message={errors?.email[0]} />} */}
        </div>

        {/* 비밀번호 */}
        <div className='space-y-2'>
          <Label htmlFor='password'>비밀번호</Label>
          <Input
            id='password'
            name='password'
            type='password'
            placeholder='비밀번호를 입력해주세요'
            // onChange={handleChange}
          />
          {/* {errors?.password && <FormMessage message={errors?.password[0]} />} */}
        </div>

        {/* 전화번호 */}
        <div className='space-y-2'>
          <Label htmlFor='phone'>전화번호</Label>
          <Input
            id='phone'
            name='phone'
            placeholder='010-XXXX-XXXX'
            // onChange={handleChange}
          />
          {/* {errors?.phone && <FormMessage message={errors.phone[0]} />} */}
        </div>
        <Submit className='w-full'>회원가입</Submit>
      </form>
    </FormCard>
  );
}
