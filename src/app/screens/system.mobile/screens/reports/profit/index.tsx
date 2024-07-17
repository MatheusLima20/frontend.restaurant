import React from 'react';
import { ProfitMobileScreen } from './profit.mobile.screen';

type Props = {
  style: any;
};

export const ProfitMobile = (props: Props) => {
  return <ProfitMobileScreen style={props.style} />;
};
