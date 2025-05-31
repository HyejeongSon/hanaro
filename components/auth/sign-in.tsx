import { signIn, signOut } from '@/auth';

export function SignIn() {
  return (
    <>
      <form
        action={async () => {
          'use server';
          await signIn('github');
        }}
      >
        <button type='submit'>Signin with GitHub</button>
      </form>
      <form
        action={async () => {
          'use server';
          await signIn('google');
        }}
      >
        <button type='submit'>Signin with Google</button>
      </form>
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button type='submit'>Sign out</button>
      </form>
    </>
  );
  // return (
  //   <>
  //     <form
  //       action={async (formData) => {
  //         "use server";
  //         await signIn("credentials", formData);
  //       }}
  //     >
  //       <label>
  //         Email
  //         <input name="email" type="email" />
  //       </label>
  //       <label>
  //         Password
  //         <input name="password" type="password" />
  //       </label>
  //       <button>Sign In</button>
  //     </form>
  //   </>
  // );
}
