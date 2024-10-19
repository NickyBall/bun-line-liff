'use client'

import { useEffect, useState } from "react";

interface Profile {
    userId?: string;
    displayName?: string;
    pictureUrl?: string;
    statusMessage?: string;
}

import liff from "@line/liff";

const LineView = () => {

    const [profile, setProfile] = useState<Profile>({ })
    const [isLiffInit, setIsLiffInit] = useState(false)

    useEffect(() => {
        liff.init({ liffId: process.env.NEXT_PUBLIC_REACT_APP_LIFF_ID as string }).then(() => {
            setIsLiffInit(true)
            if (!liff.isLoggedIn()) {
                liff.login()
            }
        })
    }, [])

    useEffect(() => {
        if (isLiffInit) {
            liff.getProfile().then(profile => {
                setProfile({
                    userId: profile.userId,
                    displayName: profile.displayName,
                    pictureUrl: profile.pictureUrl,
                    statusMessage: profile.statusMessage
                })
            })
        }
    }, [isLiffInit])

    return (
        <div>
        <h1>Line Chart</h1>
        <img src={profile.pictureUrl} alt="profile" /><br />
        <span>userId: {profile.userId}</span><br />
        <span>displayName: {profile.displayName}</span><br />
        </div>
    );
}

export default LineView;