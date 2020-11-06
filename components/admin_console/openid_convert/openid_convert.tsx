// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';

import {FormattedMessage} from 'react-intl';

import {ActionFunc} from 'mattermost-redux/types/actions';

import {AdminConfig} from 'mattermost-redux/types/config';

import {BaseProps} from 'components/admin_console/admin_settings';

import {browserHistory} from 'utils/browser_history';

import FormError from 'components/form_error';

import imagePath from 'images/openid-convert/emoticon-outline.svg';

import './openid_convert.scss';

const openidScope = 'profile openid email';

type Props = BaseProps & {
    actions: {
        updateConfig: (config: AdminConfig) => ActionFunc & Partial<{error?: ClientErrorPlaceholder}>;
    }
};
type State = {
    serverError?: string
}

type ClientErrorPlaceholder = {
    message: string;
    server_error_id: string;
}

export default class OpenIdConvert extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            serverError: undefined,
        };
    }

    upgradeConfig = async (e: React.MouseEvent) => {
        e.preventDefault();

        const newConfig = JSON.parse(JSON.stringify(this.props.config));

        newConfig.Office365Settings.Scope = openidScope;
        newConfig.Office365Settings.DiscoveryEndpoint = 'https://login.microsoftonline.com/' + newConfig.Office365Settings.DirectoryId + '/v2.0/.well-known/openid-configuration';
        newConfig.Office365Settings.UserApiEndpoint = '';
        newConfig.Office365Settings.AuthEndpoint = '';
        newConfig.Office365Settings.TokenEndpoint = '';

        newConfig.GoogleSettings.Scope = openidScope;
        newConfig.GoogleSettings.DiscoveryEndpoint = 'https://accounts.google.com/.well-known/openid-configuration';
        newConfig.GoogleSettings.UserApiEndpoint = '';
        newConfig.GoogleSettings.AuthEndpoint = '';
        newConfig.GoogleSettings.TokenEndpoint = '';

        newConfig.GitLabSettings.Scope = openidScope;
        newConfig.GitLabSettings.DiscoveryEndpoint = newConfig.GitLabSettings.Url + '/.well-known/openid-configuration';
        newConfig.GitLabSettings.UserApiEndpoint = '';
        newConfig.GitLabSettings.AuthEndpoint = '';
        newConfig.GitLabSettings.TokenEndpoint = '';

        const {error: err} = await this.props.actions.updateConfig(newConfig);
        if (err) {
            this.setState({serverError: err.message});
        } else {
            browserHistory.push('/admin_console/authentication/openid');
        }
    }

    render() {
        return (
            <div className='OpenIdConvert'>
                <div className='OpenIdConvert_imageWrapper'>
                    <img
                        className='OpenIdConvert_image'
                        src={imagePath}
                        alt='OpenId Convert Image'
                    />
                </div>

                <div className='OpenIdConvert_copyWrapper'>
                    <div className='OpenIdConvert__heading'>
                        <FormattedMessage
                            id='admin.openidconvert.heading'
                            defaultMessage='OAuth 2.0 is being deprecated and replace by OpenID Connect.'
                        />
                    </div>
                    <p>
                        <FormattedMessage
                            id='admin.openidconvert.message'
                            defaultMessage='Convert your OAuth 2.0 configuration to the new OpenID Connect standard.'
                        />
                    </p>
                    <div className='OpenIdConvert_actionWrapper'>
                        <button
                            className='btn'
                            onClick={this.upgradeConfig}
                        >
                            <FormattedMessage
                                id='admin.openidconvert.text'
                                defaultMessage='Convert to OpenId Connect'
                            />
                        </button>
                        <a
                            className='btn-secondary'
                            href='https://docs.mattermost.com/deployment/sso-gitlab.html'
                            data-testid='openid_learn_more'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            <FormattedMessage
                                id='admin.openidconvert.help'
                                defaultMessage='Learn more'
                            />
                        </a>
                        <div
                            className='error-message'
                            data-testid='errorMessage'
                        >
                            <FormError error={this.state.serverError}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}