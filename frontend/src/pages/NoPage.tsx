export default function NoPage() {
  return(
    <div className='box p-4 my-32 text-center'>
      <p className='text-4xl font-light m-8'>
        404 No Page Found
      </p>
      <p className='text-4xl font-normal font-mono m-8'>
        ¯\_(ツ)_/¯ 
      </p>
      <p className='text-4xl font-light m-8'>
        Please report this issue to us if you reached this page unexpectedly.
      </p>
      <a className='text-3xl font-medium hover:underline m-16' href="/">Back to Dashboard</a>
    </div>
  );
}
