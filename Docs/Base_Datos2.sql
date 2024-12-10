PGDMP  	    )        	        |            RegisterAsistencia    17.0    17.0 *               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false                       1262    16475    RegisterAsistencia    DATABASE     �   CREATE DATABASE "RegisterAsistencia" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Mexico.1252';
 $   DROP DATABASE "RegisterAsistencia";
                     postgres    false            �            1259    16527 
   asistencia    TABLE     �   CREATE TABLE public.asistencia (
    id_asistencia integer NOT NULL,
    id_estudiante integer,
    estado character varying(50),
    fecha_hora_entrada timestamp without time zone,
    fecha_hora_salida timestamp without time zone
);
    DROP TABLE public.asistencia;
       public         heap r       postgres    false            �            1259    16526    asistencia_id_asistencia_seq    SEQUENCE     �   CREATE SEQUENCE public.asistencia_id_asistencia_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.asistencia_id_asistencia_seq;
       public               postgres    false    224                       0    0    asistencia_id_asistencia_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.asistencia_id_asistencia_seq OWNED BY public.asistencia.id_asistencia;
          public               postgres    false    223            �            1259    16539    estudiantes    TABLE     =  CREATE TABLE public.estudiantes (
    id_estudiante integer NOT NULL,
    id_huella integer,
    id_rol integer,
    clinica character varying(255),
    programa character varying(255),
    semestre_academico character varying(255),
    asignatura character varying(255),
    especialidad character varying(255),
    nombre_estudiante character varying(255),
    identificacion character varying(255),
    semanas_rotacion integer,
    horas_por_dia integer,
    dias_semana integer,
    numero_horas_semanales integer,
    fecha_inicio date,
    fecha_terminacion date
);
    DROP TABLE public.estudiantes;
       public         heap r       postgres    false            �            1259    16538 #   estudiantes_nueva_id_estudiante_seq    SEQUENCE     �   CREATE SEQUENCE public.estudiantes_nueva_id_estudiante_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 :   DROP SEQUENCE public.estudiantes_nueva_id_estudiante_seq;
       public               postgres    false    226                        0    0 #   estudiantes_nueva_id_estudiante_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.estudiantes_nueva_id_estudiante_seq OWNED BY public.estudiantes.id_estudiante;
          public               postgres    false    225            �            1259    16484    huella    TABLE     m   CREATE TABLE public.huella (
    id_huella integer NOT NULL,
    huella_estudiante character varying(255)
);
    DROP TABLE public.huella;
       public         heap r       postgres    false            �            1259    16483    huella_id_huella_seq    SEQUENCE     �   CREATE SEQUENCE public.huella_id_huella_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.huella_id_huella_seq;
       public               postgres    false    220            !           0    0    huella_id_huella_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.huella_id_huella_seq OWNED BY public.huella.id_huella;
          public               postgres    false    219            �            1259    16477    rol    TABLE     a   CREATE TABLE public.rol (
    id_rol integer NOT NULL,
    descripcion character varying(255)
);
    DROP TABLE public.rol;
       public         heap r       postgres    false            �            1259    16476    rol_id_rol_seq    SEQUENCE     �   CREATE SEQUENCE public.rol_id_rol_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.rol_id_rol_seq;
       public               postgres    false    218            "           0    0    rol_id_rol_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.rol_id_rol_seq OWNED BY public.rol.id_rol;
          public               postgres    false    217            �            1259    16511    usuarios    TABLE     �   CREATE TABLE public.usuarios (
    id_usuario integer NOT NULL,
    id_rol integer,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    estado character varying(50)
);
    DROP TABLE public.usuarios;
       public         heap r       postgres    false            �            1259    16510    usuarios_id_usuario_seq    SEQUENCE     �   CREATE SEQUENCE public.usuarios_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.usuarios_id_usuario_seq;
       public               postgres    false    222            #           0    0    usuarios_id_usuario_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.usuarios_id_usuario_seq OWNED BY public.usuarios.id_usuario;
          public               postgres    false    221            n           2604    16530    asistencia id_asistencia    DEFAULT     �   ALTER TABLE ONLY public.asistencia ALTER COLUMN id_asistencia SET DEFAULT nextval('public.asistencia_id_asistencia_seq'::regclass);
 G   ALTER TABLE public.asistencia ALTER COLUMN id_asistencia DROP DEFAULT;
       public               postgres    false    224    223    224            o           2604    16542    estudiantes id_estudiante    DEFAULT     �   ALTER TABLE ONLY public.estudiantes ALTER COLUMN id_estudiante SET DEFAULT nextval('public.estudiantes_nueva_id_estudiante_seq'::regclass);
 H   ALTER TABLE public.estudiantes ALTER COLUMN id_estudiante DROP DEFAULT;
       public               postgres    false    226    225    226            l           2604    16487    huella id_huella    DEFAULT     t   ALTER TABLE ONLY public.huella ALTER COLUMN id_huella SET DEFAULT nextval('public.huella_id_huella_seq'::regclass);
 ?   ALTER TABLE public.huella ALTER COLUMN id_huella DROP DEFAULT;
       public               postgres    false    219    220    220            k           2604    16480 
   rol id_rol    DEFAULT     h   ALTER TABLE ONLY public.rol ALTER COLUMN id_rol SET DEFAULT nextval('public.rol_id_rol_seq'::regclass);
 9   ALTER TABLE public.rol ALTER COLUMN id_rol DROP DEFAULT;
       public               postgres    false    218    217    218            m           2604    16514    usuarios id_usuario    DEFAULT     z   ALTER TABLE ONLY public.usuarios ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuarios_id_usuario_seq'::regclass);
 B   ALTER TABLE public.usuarios ALTER COLUMN id_usuario DROP DEFAULT;
       public               postgres    false    222    221    222                      0    16527 
   asistencia 
   TABLE DATA           q   COPY public.asistencia (id_asistencia, id_estudiante, estado, fecha_hora_entrada, fecha_hora_salida) FROM stdin;
    public               postgres    false    224   ]2                 0    16539    estudiantes 
   TABLE DATA             COPY public.estudiantes (id_estudiante, id_huella, id_rol, clinica, programa, semestre_academico, asignatura, especialidad, nombre_estudiante, identificacion, semanas_rotacion, horas_por_dia, dias_semana, numero_horas_semanales, fecha_inicio, fecha_terminacion) FROM stdin;
    public               postgres    false    226   z2                 0    16484    huella 
   TABLE DATA           >   COPY public.huella (id_huella, huella_estudiante) FROM stdin;
    public               postgres    false    220   8                 0    16477    rol 
   TABLE DATA           2   COPY public.rol (id_rol, descripcion) FROM stdin;
    public               postgres    false    218   -8                 0    16511    usuarios 
   TABLE DATA           R   COPY public.usuarios (id_usuario, id_rol, username, password, estado) FROM stdin;
    public               postgres    false    222   q8       $           0    0    asistencia_id_asistencia_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.asistencia_id_asistencia_seq', 1, false);
          public               postgres    false    223            %           0    0 #   estudiantes_nueva_id_estudiante_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public.estudiantes_nueva_id_estudiante_seq', 1, false);
          public               postgres    false    225            &           0    0    huella_id_huella_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.huella_id_huella_seq', 1, false);
          public               postgres    false    219            '           0    0    rol_id_rol_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.rol_id_rol_seq', 1, false);
          public               postgres    false    217            (           0    0    usuarios_id_usuario_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.usuarios_id_usuario_seq', 2, true);
          public               postgres    false    221            y           2606    16532    asistencia asistencia_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.asistencia
    ADD CONSTRAINT asistencia_pkey PRIMARY KEY (id_asistencia);
 D   ALTER TABLE ONLY public.asistencia DROP CONSTRAINT asistencia_pkey;
       public                 postgres    false    224            {           2606    16546 "   estudiantes estudiantes_nueva_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.estudiantes
    ADD CONSTRAINT estudiantes_nueva_pkey PRIMARY KEY (id_estudiante);
 L   ALTER TABLE ONLY public.estudiantes DROP CONSTRAINT estudiantes_nueva_pkey;
       public                 postgres    false    226            s           2606    16489    huella huella_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.huella
    ADD CONSTRAINT huella_pkey PRIMARY KEY (id_huella);
 <   ALTER TABLE ONLY public.huella DROP CONSTRAINT huella_pkey;
       public                 postgres    false    220            q           2606    16482    rol rol_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.rol
    ADD CONSTRAINT rol_pkey PRIMARY KEY (id_rol);
 6   ALTER TABLE ONLY public.rol DROP CONSTRAINT rol_pkey;
       public                 postgres    false    218            u           2606    16518    usuarios usuarios_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id_usuario);
 @   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_pkey;
       public                 postgres    false    222            w           2606    16520    usuarios usuarios_username_key 
   CONSTRAINT     ]   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_username_key UNIQUE (username);
 H   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_username_key;
       public                 postgres    false    222            }           2606    16547    asistencia fk_estudiante    FK CONSTRAINT     �   ALTER TABLE ONLY public.asistencia
    ADD CONSTRAINT fk_estudiante FOREIGN KEY (id_estudiante) REFERENCES public.estudiantes(id_estudiante) ON DELETE CASCADE;
 B   ALTER TABLE ONLY public.asistencia DROP CONSTRAINT fk_estudiante;
       public               postgres    false    224    4731    226            |           2606    16521    usuarios fk_rol    FK CONSTRAINT     o   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT fk_rol FOREIGN KEY (id_rol) REFERENCES public.rol(id_rol);
 9   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT fk_rol;
       public               postgres    false    222    218    4721                  x������ � �         �  x��X�r�8]�W�2eI�Ka��["�M5T��,{ы�>i���&m:��L�Ll���s�=Wt�̈́Wc�4-���ܠ���[x5h��NK����F�=�Wk�3��o�({}�����ԍj-�ݤ�S�W�ߓ�����e�x���/([���e,��+��SV/��ʴN���۫x���2�U���{���G��%O�i�����[ux!��L俋�S�qr�C"Wքkd�g�S0V�W�G���Gy�i��]IG�I{�E�z��/JE�2 ! �qzE$�EBDk�ܴ���%d��C�����!i���"�~��*g�T&�d]�����S�Zi�$z��u�/26�*�ߚn�딉A���*EY�s`�t`:7)o���:H�y}+�2����n�ߔ�ҁZOn�`O��i|} e5�D]�9
Q��Fq9�8�����,`u1�'�R�8�<)�S��ρJ�I 3��/Y+��jt���Z=Ƚu�$[� (2I� ��ʬ��*��4҄R=h��'M�d�ޜn�rgOzMs^�Y�ճiK��A��Q��ig�X�=𐭴}lj%��*��L�����?$��fm�ʡ�	*o:�%W
V� 0#K4�lՎ��Wm!�Q�h!����Y�P����&dl����{H�N�!:�(hQ��io��P����Bz�ƩV��Aި��Y%(������b�������ߡޮ2Hw���%��T8,:J�*�^��Ϲ�C�[`	�x�B��E��P�_��c��%m'��i�x�)�э�آ.��1b	u����9:��[�8�pP�(Ѳ�yQ͇*�|_��~�״�Ȟ���%�wQ�,�z{�����^OH��#�@�%�m��D�3�Cx`��x85��F`OB�I�oӈ������Ueq���P�'�����z/��k4\�V�4!RhsY� (�P�_��^m�N�	���9��i�	U{�who�)�����7��L�,7W�wZ�E��U�5�����>|����Z�^� �tm�DI��#D]�"+�[P��.�X�����@u���������!�����D�Ӛ�"{W�?��2-Y���뒘���ENg�+��[<�%�f�V��ň�(ߘ�h1�]�� ���V���~c����$�]���Ampr���ʭ���g�{�E�Q �j��,DAV�jF�6A1�x�VGpr�x��0FJ2Z�b����}�Z`4����z�q�eK^?���>��?`�]aƦ�C7k�&�|PQ?�p�=���h�G�:�s Ǘ�+��9�x��߮M�hm��˝"�t�{���M
-�^/����V-�A�8~�"L
������i�����pڝA+f�|Q�_�]A�l���'^���'��<����Z��a޷�����B�            x������ � �         4   x�3�tL����,.)JL�/�2�-.M,���2�t-.)M�L�+I����� I�         5   x�3�4�tL����,.)JL�/B�%&�d��sqq��&e��i�T� `I     