import { Component } from 'react'
import { Link } from 'react-router-dom'
import path from '../../ultis/path'

class ErrorBoundary extends Component {
    state = {
        hasError: false
    }

    static getDerivedStateFromError(_) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true }
    }

    componentDidCatch(error, errorInfo) {
        console.error('Uncaught error:', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return (
                <>
                    <h1 className='mt-12 font-semibold text-red-600 text-xl text-center'>
                        Sorry... Something is wrong. Please try later!
                    </h1>
                    <Link
                        to={path.HOME}
                        className='block bg-primary hover:opacity-80 mx-auto mt-8 px-8 py-3.5 rounded w-fit text-white text-lg text-center'
                    >
                        Trở về trang chủ
                    </Link>
                </>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
