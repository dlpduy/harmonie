import { Menu, MenuProps } from "antd";
import { AppstoreOutlined, BellOutlined, HomeOutlined, LoginOutlined, LogoutOutlined, MenuOutlined, SettingOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import './header.css'
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
const Header = () => {
    type MenuItem = Required<MenuProps>['items'][number];
    //const { isLogin } = props;
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const handleLogout = () => {
        localStorage.removeItem("access_token"); // Xóa token
        setIsLogin(false);
        navigate('/login');
    };

    const items: MenuItem[] = [
        {
            label: 'logo',
            key: 'logo',
            icon: <MenuOutlined />,

        },
        {
            label: (
                <Link to="/">Trang chủ</Link>
            ),
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: 'Thông báo',
            key: 'notification',
            icon: <BellOutlined />,
        },
        isLogin === false ? {
            label: (
                <Link to="/login" style={{ color: "black" }}>Đăng nhập</Link>
            ),
            key: 'login',
            icon: <LoginOutlined />,
            style: {
                right: 10,
                position: 'absolute',
                color: 'black'
            },
        } :
            {
                key: 'login',
                label: "Xin chào Đinh Lê Phúc Duy",
                icon: <UserOutlined />,
                style: {
                    right: 10,
                    position: 'absolute',
                    color: 'black',
                    textDecoration: 'none',
                },
                children: [
                    {
                        label: <Link to="/account">Thông tin cá nhân</Link>,
                        key: 'setting:1',
                        icon: <SettingOutlined />,
                        style: {
                            color: 'black'
                        },

                    },
                    {
                        label: <Link to="/store">Trở thành người bán hàng</Link>,
                        key: 'setting:2',
                        icon: <AppstoreOutlined />
                    },
                    {
                        label: <Link to="/cart">Giỏ hàng</Link>,
                        key: 'contact',
                        icon: <ShoppingCartOutlined />,
                    },
                    {
                        label: "Đăng xuất",
                        key: 'setting:3',
                        icon: <LogoutOutlined />,
                        onClick: () => handleLogout()
                    }
                ]
            }

    ];
    return (
        <Menu
            mode="horizontal"
            items={items}
            style={{ position: 'fixed', width: '100%', zIndex: 100 }}
        />
    );
}

export default Header;