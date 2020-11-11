// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';

import amex from 'src/images/cloud/cards/amex.png';

import dinersclub from 'src/images/cloud/cards/dinersclub.png';
import discover from 'src/images/cloud/cards/discover.jpg';
import jcb from 'src/images/cloud/cards/jcb.png';
import mastercard from 'src/images/cloud/cards/mastercard.png';
import visa from 'src/images/cloud/cards/visa.jpg';

import './card_image.css';

type Props = {
    brand: string;
}

export default function CardImage(props: Props) {
    const {brand} = props;

    const cardImageSrc = getCardImage(brand);
    if (cardImageSrc) {
        return (
            <img
                className='CardImage'
                src={cardImageSrc}
                alt={brand}
            />
        );
    }

    return null;
}

function getCardImage(brand: string): string {
    switch (brand) {
    case 'amex':
        return amex;
    case 'diners':
        return dinersclub;
    case 'discover':
        return discover;
    case 'jcb':
        return jcb;
    case 'mastercard':
        return mastercard;
    case 'visa':
        return visa;
    }

    return '';
}
