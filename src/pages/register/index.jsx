import { useNavigate } from "react-router-dom";
import { MdEmail, MdLock, MdPerson } from 'react-icons/md';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';
import { useForm } from "react-hook-form";
import { Container, Title, Column, TitleRegister, SubtitleRegister, Row, Wrapper, CriarText } from './styles';
const Register = () => {
    const navigate = useNavigate();
    const { control, handleSubmit, formState: { errors } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });
    const onSubmit = async (formData) => {
        try {
            const { data } = await api.get(`/users?email=${formData.email}`);
            if (data.length) {
                alert('E-mail já cadastrado');
                return;
            }
            await api.post('/users', {
                name: formData.name,
                email: formData.email,
                senha: formData.senha
            });
            alert('Usuário cadastrado com sucesso');
            navigate('/login');
        } catch (e) {
            alert('Erro ao cadastrar usuário');
        }
    };
    return (<>
        <Header />
        <Container>
            <Column>
                <Title>A plataforma para você aprender com experts, dominar as principais tecnologias
                    e entrar mais rápido nas empresas mais desejadas.</Title>
            </Column>
            <Column>
                <Wrapper>
                    <TitleRegister>Cadastre-se</TitleRegister>
                    <SubtitleRegister>Preencha seus dados para criar sua conta.</SubtitleRegister>
                    <form onSubmit={handleSubmit(onSubmit)}>
                            <Input placeholder="Name" leftIcon={<MdPerson />} name="name" control={control} />
                            {errors.name && <span>Nome é obrigatório</span>}
                            <Input placeholder="E-mail" leftIcon={<MdEmail />} name="email" control={control} />
                            {errors.email && <span>E-mail é obrigatório</span>}
                            <Input type="password" placeholder="Senha" leftIcon={<MdLock />} name="senha" control={control} />
                            {errors.senha && <span>Senha é obrigatório</span>}
                            
                            <Button title="Cadastrar" variant="secondary" type="submit" />
                    </form>
                    <Row>
                        <CriarText onClick={() => navigate('/login')}>Já tem uma conta? Faça login</CriarText>
                    </Row>
                </Wrapper>
            </Column>
        </Container>
    </>)
}
export { Register }