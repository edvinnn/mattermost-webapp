// Copyright (c) 2017 Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import {batchActions} from 'redux-batched-actions';

import {Client} from 'client';
import {FileTypes} from 'action_types';
import {getLogErrorAction} from './errors';
import {forceLogoutIfNecessary} from './helpers';

export function getFilesForPost(teamId, channelId, postId) {
    return async (dispatch, getState) => {
        dispatch({type: FileTypes.FETCH_FILES_FOR_POST_REQUEST}, getState);
        let files;

        try {
            files = await Client.getFileInfosForPost(teamId, channelId, postId);
        } catch (error) {
            forceLogoutIfNecessary(error, dispatch);
            dispatch(batchActions([
                {type: FileTypes.FETCH_FILES_FOR_POST_FAILURE, error},
                getLogErrorAction(error)
            ]), getState);
            return;
        }

        dispatch(batchActions([
            {
                type: FileTypes.RECEIVED_FILES_FOR_POST,
                data: files,
                postId
            },
            {
                type: FileTypes.FETCH_FILES_FOR_POST_SUCCESS
            }
        ]), getState);
    };
}