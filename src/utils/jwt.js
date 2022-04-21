import JWT from 'jsonwebtoken'

export default {
    sign: payload => JWT.sign(payload, 'project', { expiresIn: '1h' }),
    verify: token => JWT.verify(token, 'project'),
}