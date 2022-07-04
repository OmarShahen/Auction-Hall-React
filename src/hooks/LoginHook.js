import React from 'react'
import { useGoogleLogin } from 'react-google-login'

const clientId = '559358981764-0qp76rv3cq9oscol7p1oqg2np6bhilj7.apps.googleusercontent.com'

function LoginHooks() {
    const onSuccess = res  => {
        console.log('success')
        console.log(res.profileObj)
    }

    const onFailure = res => {
        console.log(res)
    }

    const { signIn } = useGoogleLogin({
        onSuccess,
        onFailure,
        clientId,
        isSignedIn: true,
        accessType: 'offline'
    })

    return (<button onClick={signIn}>
        Sign In With Google
    </button>)
}

export default LoginHooks