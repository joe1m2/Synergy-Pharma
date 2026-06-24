package com.synergypharma.entity;

/**
 * User roles for role-based access control.
 * ADMIN  — full backend management access
 * STAFF  — limited content management access
 * USER   — read-only portal access (future phases)
 */
public enum Role {
    ADMIN,
    STAFF,
    USER
}
