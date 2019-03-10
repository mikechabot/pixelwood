import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

export const CheckCircle = () => (<FontAwesomeIcon className="has-text-success" icon={faCheckCircle}/>);
export const TimesCircle = () => (<FontAwesomeIcon className="has-text-danger" icon={faTimesCircle}/>);
