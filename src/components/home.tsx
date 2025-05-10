import { h } from 'preact';

interface Props {
  path?: string;
}

export default function Home({ path: _ }: Props): h.JSX.Element {
  return(
    <>
      <h1 className="">Multi Tools</h1>
      <p className="text-notice p-2">This application tools aim to use for personal development purpose.</p>
      <div className="columns-1 ...">
        <div className="diff-check p-5">
          <a href="/diffcheck">Diff Checker</a>
        </div>
      </div>
    </>
  );
}