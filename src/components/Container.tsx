type ContainerProps = {
    children: React.ReactNode
}

const Container = (props: ContainerProps) => {
    return (
        <main className='mx-auto flex w-full max-w-5xl flex-col bg-slate-50 md:flex-row md:px-4 md:py-20'>
            {props.children}
        </main>
    )
}

export default Container
