import React, { FC } from 'react';

import '@/app/components/background/Background.scss';

const Background: FC = () => {
  return (
    <svg
      className={'background'}
      xmlns={'http://www.w3.org/2000/svg'}
      xmlnsXlink={'http://www.w3.org/1999/xlink'}
      version={'1.1'}
      id={'Calque_1'}
      x={'0px'}
      y={'0px'}
      viewBox={'0 0 1300 550'}
      xmlSpace={'preserve'}
      preserveAspectRatio={'none'}>
      <path className={'st1'} d={'M 0 250 C 600 450 650 100 1300 250 L 1300 550 L 0 550 L 0 250'}>
        <animate
          attributeName={'d'}
          dur={'5s'}
          begin={'1s'}
          // eslint-disable-next-line react/jsx-curly-brace-presence
          values='M 0 250 C 600 450 650 100 1300 250 L 1300 550 L 0 550 L 0 250;
                M 0 250 C 600 100 650 450 1300 250 L 1300 550 L 0 550 L 0 250;
				M 0 250 C 600 450 650 100 1300 250 L 1300 550 L 0 550 L 0 250'
          repeatCount={'indefinite'}
        />
      </path>

      <path className={'st1'} d={'M 0 250 C 600 100 650 450 1300 250 L 1300 550 L 0 550 L 0 250'}>
        <animate
          attributeName={'d'}
          dur={'5s'}
          // eslint-disable-next-line react/jsx-curly-brace-presence
          values='M 0 250 C 600 100 650 450 1300 250 L 1300 550 L 0 550 L 0 250;
                M 0 250 C 600 450 650 100 1300 250 L 1300 550 L 0 550 L 0 250;
				M 0 250 C 600 100 650 450 1300 250 L 1300 550 L 0 550 L 0 250'
          repeatCount={'indefinite'}
        />
      </path>

      <path className={'st1'} d={'M 0 250 C 950 350 950 150 1300 250 L 1300 550 L 0 550 L 0 250'}>
        <animate
          attributeName={'d'}
          dur={'5s'}
          begin={'2s'}
          // eslint-disable-next-line react/jsx-curly-brace-presence
          values='M 0 250 C 950 350 950 150 1300 250 L 1300 550 L 0 550 L 0 250;
                M 0 250 C 350 150 350 350 1300 250 L 1300 550 L 0 550 L 0 250;
				M 0 250 C 950 350 950 150 1300 250 L 1300 550 L 0 550 L 0 250'
          repeatCount={'indefinite'}
        />
      </path>

      <path className={'st1'} d={'M 0 250 C 350 150 350 350 1300 250 L 1300 550 L 0 550 L 0 250'}>
        <animate
          attributeName={'d'}
          dur={'5s'}
          // eslint-disable-next-line react/jsx-curly-brace-presence
          values='M 0 250 C 350 150 350 350 1300 250 L 1300 550 L 0 550 L 0 250;
                M 0 250 C 950 350 950 150 1300 250 L 1300 550 L 0 550 L 0 250;
				M 0 250 C 350 150 350 350 1300 250 L 1300 550 L 0 550 L 0 250'
          repeatCount={'indefinite'}
        />
      </path>
    </svg>
  );
};

export default Background;
