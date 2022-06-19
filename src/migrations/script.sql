create table answers
(
    id          int auto_increment
        primary key,
    is_active   tinyint(1) default 1 null,
    text        varchar(255)         not null,
    question_id int                  not null,
    is_true     tinyint(1) default 0 null,
    constraint answers_id_uindex
        unique (id)
);

create index answers_question_id_index
    on answers (question_id);

create table game_statistics
(
    id          int auto_increment
        primary key,
    game_id     int not null,
    question_id int not null,
    answer_id   int not null,
    constraint gqa_unique
        unique (game_id, question_id, answer_id)
);

create index game_statistics_question_id_index
    on game_statistics (question_id);

create table games
(
    id      int auto_increment
        primary key,
    user_id int                                 not null,
    date    timestamp default CURRENT_TIMESTAMP not null,
    constraint games_id_uindex
        unique (id)
);

create index games_user_id_index
    on games (user_id);

create table questions
(
    id       int auto_increment
        primary key,
    text     varchar(255) null,
    theme_id int          not null,
    constraint questions_id_uindex
        unique (id)
);

create index questions_theme_id_index
    on questions (theme_id);

create table themes
(
    id   int auto_increment
        primary key,
    name varchar(30) not null,
    constraint themes_id_uindex
        unique (id)
);

create table users
(
    id       int auto_increment
        primary key,
    login    varchar(80)                         not null,
    password varchar(80)                         not null,
    email    varchar(80)                         null,
    dt       timestamp default CURRENT_TIMESTAMP not null,
    constraint users_login_uindex
        unique (login)
);
